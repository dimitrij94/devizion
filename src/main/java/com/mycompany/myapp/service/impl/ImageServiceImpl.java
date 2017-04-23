package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ImageTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import java.io.*;

/**
 * Created by Dmitrij on 13.04.2017.
 */
@Service
public class ImageServiceImpl implements ImageService {

    private String imageRepositoryPath = "D:/Projects/Devizion/src/main/resources/images";
    private ImageTokenService imageTokenService;

    public ImageServiceImpl(ImageTokenService imageTokenService) {
        this.imageTokenService = imageTokenService;
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
        return image.delete();
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
            imageToken = imageTokenService.save(new ImageToken(fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<ImageToken>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ImageToken>(imageToken, HttpStatus.OK);
    }

}
