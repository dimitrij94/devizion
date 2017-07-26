package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.ImageToken;
import com.mycompany.myapp.repository.ImageTokenRepository;
import com.mycompany.myapp.service.ImageTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ImageToken.
 */
@Service
@Transactional
public class ImageTokenServiceImpl implements ImageTokenService{

    private final Logger log = LoggerFactory.getLogger(ImageTokenServiceImpl.class);

    private final ImageTokenRepository imageTokenRepository;

    public ImageTokenServiceImpl(ImageTokenRepository imageTokenRepository) {
        this.imageTokenRepository = imageTokenRepository;
    }

    /**
     * Save a imageToken.
     *
     * @param imageToken the entity to save
     * @return the persisted entity
     */
    @Override
    public ImageToken save(ImageToken imageToken) {
        log.debug("Request to save ImageToken : {}", imageToken);
        ImageToken result = imageTokenRepository.save(imageToken);
        return result;
    }

    /**
     *  Get all the imageTokens.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ImageToken> findAll() {
        log.debug("Request to get all ImageTokens");
        List<ImageToken> result = imageTokenRepository.findAll();

        return result;
    }

    /**
     *  Get one imageToken by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ImageToken findOne(Long id) {
        log.debug("Request to get ImageToken : {}", id);
        ImageToken imageToken = imageTokenRepository.findOne(id);
        return imageToken;
    }

    /**
     *  Delete the  imageToken by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ImageToken : {}", id);
        imageTokenRepository.delete(id);
    }
}
