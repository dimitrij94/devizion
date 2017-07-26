package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.SlidePage;

import java.util.List;

/**
 * Service Interface for managing SlidePage.
 */
public interface SlidePageService {

    /**
     * Save a slidePage.
     *
     * @param slidePage the entity to save
     * @return the persisted entity
     */
    SlidePage save(SlidePage slidePage);

    /**
     *  Get all the slidePages.
     *
     *  @return the list of entities
     */
    List<SlidePage> findAll();

    /**
     *  Get the "id" slidePage.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SlidePage findOne(Long id);

    void deleteImage(String path);

    /**
     *  Delete the "id" slidePage.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
