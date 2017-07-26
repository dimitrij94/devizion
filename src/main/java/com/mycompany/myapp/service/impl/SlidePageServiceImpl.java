package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.repository.SlidePageRepository;
import com.mycompany.myapp.service.ImageService;
import com.mycompany.myapp.service.SlidePageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing SlidePage.
 */
@Service
@Transactional
public class SlidePageServiceImpl implements SlidePageService {

    private final Logger log = LoggerFactory.getLogger(SlidePageServiceImpl.class);
    private final ImageService imageService;
    private final SlidePageRepository slidePageRepository;
    private final String imageStaragePath = "/slides/";

    public SlidePageServiceImpl(ImageService imageService, SlidePageRepository slidePageRepository) {
        this.imageService = imageService;
        this.slidePageRepository = slidePageRepository;
    }

    /**
     * Save a slidePage.
     *
     * @param slidePage the entity to save
     * @return the persisted entity
     */
    @Override
    public SlidePage save(SlidePage slidePage) {
        log.debug("Request to save SlidePage : {}", slidePage);
        return slidePageRepository.save(slidePage);
    }

    /**
     * Get all the slidePages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SlidePage> findAll() {
        log.debug("Request to get all SlidePages");
        return slidePageRepository.findAll();
    }

    /**
     * Get one slidePage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SlidePage findOne(Long id) {
        log.debug("Request to get SlidePage : {}", id);
        return slidePageRepository.findOne(id);
    }
    @Override
    public void deleteImage(String path) {
        this.imageService.deleteImage(this.imageStaragePath, path);
    }

    /**
     * Delete the  slidePage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SlidePage : {}", id);
        SlidePage delPage = findOne(id);
        String photoUri = delPage.getPhotoUri();
        if (photoUri != null)
            this.deleteImage(photoUri);

        slidePageRepository.delete(id);
    }
}
