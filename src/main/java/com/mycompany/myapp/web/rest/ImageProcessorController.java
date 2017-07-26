package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ImageTokenService;
import com.mycompany.myapp.service.dto.ImageBounds;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;

/**
 * Created by Dmitrij on 12.04.2017.
 */
@RestController
public class ImageProcessorController {


    private ImageTokenService imageTokenService;
    private ImageService imageService;
    private MultipartResolver multipartResolver;
    private String imageStoragePath = "/home/dmitrij/Pictures/DevizionPhotos";
    private String windowStaragePath = "D:/Projects/Devizion/src/main/resources/images";

    public ImageProcessorController(ImageTokenService imageTokenService, ImageService imageService, MultipartResolver multipartResolver) {
        this.imageTokenService = imageTokenService;
        this.imageService = imageService;
        this.multipartResolver = multipartResolver;
    }


    @PostMapping(value = "/api/{directoryName}/image")
    public ResponseEntity<ImageToken> postPortfolioImage(final MultipartHttpServletRequest request,
                                                         @PathVariable("directoryName") String directoryName) throws ParseException {
        MultipartFile file = request.getFile(request.getFileNames().next());
        return imageService.saveImage("/" + directoryName + "/", file);
    }

    @PostMapping(value = "/api/{directory}/image/cropped")
    public ResponseEntity<ImageToken> postCroppedImage(@RequestBody ImageBounds cropBounds,
                                                       @PathVariable("directory") String directory) {
        return imageService.saveCroppedImage("/" + directory + "/", cropBounds);
    }

    @GetMapping(value = "/api/image/{directory}")
    public ResponseEntity<byte[]> getImageBody(@PathVariable("directory") String directory,
                                               @RequestParam("imageName") String imageName) throws IOException {
        File image = new File(this.imageStoragePath + "/" + directory + "/" + imageName);
        if (image.exists() && image.canRead()) {
            byte[] responceBody = FileUtils.readFileToByteArray(image);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(responceBody.length);
            headers.setCacheControl("max-age=100000");
            headers.setContentType(MediaType.parseMediaType("image/" + FilenameUtils.getExtension(imageName)));

            return new ResponseEntity<byte[]>(responceBody, headers, HttpStatus.OK);
        } else return new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping(value = "/api/image/size/{directory}")
    public ResponseEntity<byte[]> getImageBodyOfSize(@PathVariable("directory") String directory,
                                                     @RequestParam("imageName") String imageName,
                                                     @RequestParam("imageScalarSize") String imageScalarSize,
                                                     @RequestParam("screenSize") String screenSize) throws IOException {
        File image = new File(
            this.imageStoragePath + "/" +
                directory + "/" +
                screenSize + "/" +
                imageScalarSize + "/" +
                imageName);
        if (image.exists() && image.canRead()) {
            byte[] responceBody = FileUtils.readFileToByteArray(image);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentLength(responceBody.length);
            headers.setCacheControl("max-age=100000");
            headers.setContentType(MediaType.parseMediaType("image/" + FilenameUtils.getExtension(imageName)));

            return new ResponseEntity<>(responceBody, headers, HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/api/product/image")
    public ResponseEntity<ImageToken> updateImage(@RequestParam("old_file_name") String oldFilePath,
                                                  @RequestParam("image") MultipartFile request) {
        return this.imageService.updateImage("/products/", oldFilePath, request);
    }

    @DeleteMapping("/api/{subdirectory}/image")
    public HttpStatus imageUploadCanceled(@RequestParam("token_id") long tokenId,
                                          @PathVariable("subdirectory") String subdirectory) {
        return this.imageService.imageUploadCanceled(tokenId, "/" + subdirectory + "/");
    }

}
