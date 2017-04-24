package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ImageTokenService;
import com.mycompany.myapp.service.dto.MyImageSizeHolder;
import com.mycompany.myapp.service.dto.ScreenSize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.RenderingHints;
import java.util.Map;
import java.util.HashMap;
import java.awt.RenderingHints.Key;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.*;

/**
 * Created by Dmitrij on 13.04.2017.
 */


@Service
public class ImageServiceImpl implements ImageService {

    private final Logger log = LoggerFactory.getLogger(ImageServiceImpl.class);
    private String imageRepositoryPath = "D:/Projects/Devizion/src/main/resources/images";
    private ImageTokenService imageTokenService;

    public ImageServiceImpl(ImageTokenService imageTokenService) {
        createImageSizesDirectories();
        this.imageTokenService = imageTokenService;
    }

    private void createImageSizesDirectories() {
        File rootDir = new File(imageRepositoryPath);
        for (File file : rootDir.listFiles()) {
            if (!file.isDirectory()) continue;
            for (ScreenSize screenSize : ScreenSize.values()) {
                File screenSizeDir = new File(file.getPath() + "/" + String.valueOf(screenSize));
                if (!screenSizeDir.exists()) screenSizeDir.mkdir();
                for (double scalar : MyImageSizeHolder.getScalars()) {
                    File screenSizeScalarDir = new File(screenSizeDir.getPath() + "/" + String.valueOf(scalar));
                    if (!screenSizeScalarDir.exists()) screenSizeScalarDir.mkdir();
                }
            }
        }
    }

    @Override
    public ResponseEntity<ImageToken> updateImage(
        String subFolderName,
        String oldFilePath,
        MultipartFile request) {
        File image = new File(oldFilePath);
        if (image.exists()) image.delete();
        return this.saveImage(subFolderName, request);
    }

    @Override
    public HttpStatus imageUploadCanceled(long tokenId, String imageSubPath) {
        ImageToken token = this.imageTokenService.findOne(tokenId);
        boolean imageDeleted = this.deleteImage(imageSubPath, token.getPath());
        if (imageDeleted) {
            this.imageTokenService.delete(tokenId);
            return HttpStatus.OK;
        } else return HttpStatus.BAD_REQUEST;
    }

    @Override
    public boolean deleteImage(String imageSubPath, String path) {
        File image = new File(this.imageRepositoryPath + imageSubPath + path);
        if (!image.delete()) return false;
        for (ScreenSize screenSize : ScreenSize.values()) {
            File screenSizeDir = new File(this.imageRepositoryPath + imageSubPath + "/" + String.valueOf(screenSize));
            if (screenSizeDir.exists())
                for (double scalar : MyImageSizeHolder.getScalars()) {
                    File screenSizeScalarDir = new File(screenSizeDir.getPath() + "/" + String.valueOf(scalar));
                    if (screenSizeScalarDir.exists()) {
                        File scaledImageFile = new File(screenSizeScalarDir.getPath() + path);
                        //if (!scaledImageFile.delete()) return false;
                    }
                }
        }
        return true;
    }

    @Override
    public ResponseEntity<ImageToken> saveImage(String imageSubPath,
                                                MultipartFile file) {
        ByteArrayInputStream inStream = null;
        FileOutputStream outStream = null;
        String fileName = file.getOriginalFilename();
        String filePath = this.imageRepositoryPath + imageSubPath + fileName;
        ImageToken imageToken = null;

        try {
            byte[] bytes = file.getBytes();
            BufferedOutputStream buffStream =
                new BufferedOutputStream(new FileOutputStream(new File(filePath)));
            buffStream.write(bytes);
            buffStream.close();
            saveResizeCopies(fileName, filePath, file.getContentType(), imageSubPath);
            imageToken = imageTokenService.save(new ImageToken(fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<ImageToken>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ImageToken>(imageToken, HttpStatus.OK);
    }

    private void saveResizeCopies(String fileName, String path, String formatName, String subPath) throws IOException {
        BufferedImage image = ImageIO.read(new File(path));
        int width = image.getWidth();
        int height = image.getHeight();
        BufferedImage scaledImage;
        MyImageSizeHolder[] imageSizeHolders = getScaledParameters(width, height);
        for (int i = 0; i < ScreenSize.values().length; i++) {
            MyImageSizeHolder imageSize = imageSizeHolders[i];
            for (int j = 0; j < MyImageSizeHolder.NUM_SCALARS; j++) {
                scaledImage = createResizeCopy(image, imageSize.getWidths()[j], imageSize.getHeights()[j], true);
                saveResizeCopy(
                    scaledImage,
                    ScreenSize.values()[i],
                    String.valueOf(MyImageSizeHolder.getScalars()[j]),
                    formatName,
                    fileName,
                    subPath);
            }
        }
    }

    private void saveResizeCopy(BufferedImage image,
                                ScreenSize screenSize,
                                String scalarName,
                                String formatName,
                                String fileOriginalName,
                                String subdirectoryPath) {
        try {
            File newImageFile
                = new File(this.imageRepositoryPath +
                subdirectoryPath +
                String.valueOf(screenSize) + "/" +
                scalarName + "/" +
                fileOriginalName);
            if (!newImageFile.exists()) newImageFile.createNewFile();
            ImageIO.write(image, formatName.split("/")[1], newImageFile);
        } catch (IOException ex) {
            log.error("Failed to save the resize version of image" + fileOriginalName + ex.getMessage());
        }
    }

    private MyImageSizeHolder[] getScaledParameters(int width, int height) {
        float widthToHeightRation = (float) height / (float) width;
        MyImageSizeHolder[] imageSizeHolders = new MyImageSizeHolder[ScreenSize.values().length];
        ScreenSize[] screenSizes = ScreenSize.values();
        for (int i = 0; i < screenSizes.length; i++) {
            int screenMaxSize = screenSizes[i].getMaxWidth();
            if (screenMaxSize * MyImageSizeHolder.getScalars()[0] <= width)
                imageSizeHolders[i] = new MyImageSizeHolder(screenMaxSize, new Float(screenMaxSize * widthToHeightRation).intValue());
        }
        return imageSizeHolders;
    }

    private BufferedImage createResizeCopy(Image originalImage, int scaledWidth, int scaledHeight, boolean preserveAlpha) {
        int imageType = preserveAlpha ? BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;
        BufferedImage scaledBI = new BufferedImage(scaledWidth, scaledHeight, imageType);
        Graphics2D g = scaledBI.createGraphics();
        //RenderingHints.KEY_INTERPOLATION => RenderingHints.VALUE_INTERPOLATION_BICUBIC
        //RenderingHints.KEY_ANTIALIASING  => RenderingHints.VALUE_ANTIALIAS_ON
        //	KEY_RENDERING 	VALUE_RENDER_QUALITY
        Map<RenderingHints.Key, Object> renderingHintsMap = new HashMap<RenderingHints.Key, Object>(3);
        renderingHintsMap.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        renderingHintsMap.put(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        renderingHintsMap.put(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

        g.setRenderingHints(renderingHintsMap);

        if (preserveAlpha) {
            g.setComposite(AlphaComposite.Src);
        }
        g.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null);
        g.dispose();
        return scaledBI;
    }
}


