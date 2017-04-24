package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.ImageTokenService;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;

/**
 * Created by Dmitrij on 12.04.2017.
 */
@RestController
public class ImageProcessorController {


    private ImageTokenService imageTokenService;
    private ImageService imageService;
    private MultipartResolver multipartResolver;
    private String imageStoragePath = "D:\\Projects\\Devizion\\src\\main\\resources\\images";

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

    @GetMapping(value = "/api/image/{directory}", produces = "image/*")
    public ResponseEntity<byte[]> getImageBody(@PathVariable("directory") String directory,
                                               @RequestParam("imageName") String imageName) throws IOException {
        File image = new File(this.imageStoragePath + "\\" + directory + "\\" + imageName);
        if (image.exists() && image.canRead()) {
            return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(image), HttpStatus.OK);
        } else return new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping(value = "/api/image/size/{directory}", produces = "image/*")
    public ResponseEntity<byte[]> getImageBodyOfSize(@PathVariable("directory") String directory,
                                                     @RequestParam("imageName") String imageName,
                                                     @RequestParam("imageScalarSize") String imageScalarSize,
                                                     @RequestParam("screenSize") String screenSize) throws IOException{
        File image = new File(
            this.imageStoragePath + "\\" +
                directory + "\\" +
                screenSize + "\\" +
                imageScalarSize + "\\" +
                imageName);
        if (image.exists() && image.canRead()) {
            return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(image), HttpStatus.OK);
        } else return new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/api/product/image")
    public ResponseEntity<ImageToken> updateImage(@RequestParam("old_file_name") String oldFilePath,
                                                  @RequestParam("image") MultipartFile request) {
        return this.imageService.updateImage("/products/", oldFilePath, request);
    }

    @DeleteMapping("/api/product/image")
    public HttpStatus imageUploadCanceled(@RequestParam("token_id") long tokenId) {
        return this.imageService.imageUploadCanceled(tokenId, "/product/");
    }

    @DeleteMapping(value = "/api/category/image")
    public HttpStatus categoryImageCanceled(@RequestParam("token_id") long tokenId) {
        return this.imageService.imageUploadCanceled(tokenId, "/categories/");
    }
}
