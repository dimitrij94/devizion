package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.PortfolioEntryService;
import com.mycompany.myapp.domain.PortfolioEntry;
import com.mycompany.myapp.repository.PortfolioEntryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing PortfolioEntry.
 */
@Service
@Transactional
public class PortfolioEntryServiceImpl implements PortfolioEntryService{

    private final Logger log = LoggerFactory.getLogger(PortfolioEntryServiceImpl.class);
    
    private final PortfolioEntryRepository portfolioEntryRepository;

    public PortfolioEntryServiceImpl(PortfolioEntryRepository portfolioEntryRepository) {
        this.portfolioEntryRepository = portfolioEntryRepository;
    }

    /**
     * Save a portfolioEntry.
     *
     * @param portfolioEntry the entity to save
     * @return the persisted entity
     */
    @Override
    public PortfolioEntry save(PortfolioEntry portfolioEntry) {
        log.debug("Request to save PortfolioEntry : {}", portfolioEntry);
        PortfolioEntry result = portfolioEntryRepository.save(portfolioEntry);
        return result;
    }

    /**
     *  Get all the portfolioEntries.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PortfolioEntry> findAll() {
        log.debug("Request to get all PortfolioEntries");
        List<PortfolioEntry> result = portfolioEntryRepository.findAll();

        return result;
    }

    /**
     *  Get one portfolioEntry by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PortfolioEntry findOne(Long id) {
        log.debug("Request to get PortfolioEntry : {}", id);
        PortfolioEntry portfolioEntry = portfolioEntryRepository.findOne(id);
        return portfolioEntry;
    }

    /**
     *  Delete the  portfolioEntry by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PortfolioEntry : {}", id);
        portfolioEntryRepository.delete(id);
    }
}
