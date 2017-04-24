package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.PortfolioEntry;
import java.util.List;

/**
 * Service Interface for managing PortfolioEntry.
 */
public interface PortfolioEntryService {

    /**
     * Save a portfolioEntry.
     *
     * @param portfolioEntry the entity to save
     * @return the persisted entity
     */
    PortfolioEntry save(PortfolioEntry portfolioEntry);

    /**
     *  Get all the portfolioEntries.
     *  
     *  @return the list of entities
     */
    List<PortfolioEntry> findAll();

    /**
     *  Get the "id" portfolioEntry.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PortfolioEntry findOne(Long id);

    /**
     *  Delete the "id" portfolioEntry.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
