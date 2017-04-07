package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Custumer;
import java.util.List;

/**
 * Service Interface for managing Custumer.
 */
public interface CustumerService {

    /**
     * Save a custumer.
     *
     * @param custumer the entity to save
     * @return the persisted entity
     */
    Custumer save(Custumer custumer);

    /**
     *  Get all the custumers.
     *  
     *  @return the list of entities
     */
    List<Custumer> findAll();

    /**
     *  Get the "id" custumer.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Custumer findOne(Long id);

    /**
     *  Delete the "id" custumer.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
