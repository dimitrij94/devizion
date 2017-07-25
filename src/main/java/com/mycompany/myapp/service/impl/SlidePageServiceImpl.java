package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.SlidePageService;
import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.repository.SlidePageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing SlidePage.
 */
@Service
@Transactional
public class SlidePageServiceImpl implements SlidePageService{

    private final Logger log = LoggerFactory.getLogger(SlidePageServiceImpl.class);
    
    private final SlidePageRepository slidePageRepository;

    public SlidePageServiceImpl(SlidePageRepository slidePageRepository) {
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
        SlidePage result = slidePageRepository.save(slidePage);
        return result;
    }

    /**
     *  Get all the slidePages.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SlidePage> findAll() {
        log.debug("Request to get all SlidePages");
        List<SlidePage> result = slidePageRepository.findAll();

        return result;
    }

    /**
     *  Get one slidePage by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SlidePage findOne(Long id) {
        log.debug("Request to get SlidePage : {}", id);
        SlidePage slidePage = slidePageRepository.findOne(id);
        return slidePage;
    }

    /**
     *  Delete the  slidePage by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SlidePage : {}", id);
        slidePageRepository.delete(id);
    }
}
