package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ImageToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * Created by Dmitrij on 13.04.2017.
 */
public interface ImageService {
    ResponseEntity<ImageToken> updateImage(
        String subFolderName,
        String oldFilePath,
        MultipartFile request);

    HttpStatus imageUploadCanceled(long tokenId, String imageSubPath);

    boolean deleteImage(String imageSubPath, String path);

    ResponseEntity<ImageToken> saveImage(String imageSubPath,
                                         MultipartFile file);
}
