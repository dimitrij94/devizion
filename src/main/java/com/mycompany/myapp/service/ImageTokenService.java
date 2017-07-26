package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ImageToken;

import java.util.List;

/**
 * Service Interface for managing ImageToken.
 */
public interface ImageTokenService {

    /**
     * Save a imageToken.
     *
     * @param imageToken the entity to save
     * @return the persisted entity
     */
    ImageToken save(ImageToken imageToken);

    /**
     *  Get all the imageTokens.
     *
     *  @return the list of entities
     */
    List<ImageToken> findAll();

    /**
     *  Get the "id" imageToken.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ImageToken findOne(Long id);

    /**
     *  Delete the "id" imageToken.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
