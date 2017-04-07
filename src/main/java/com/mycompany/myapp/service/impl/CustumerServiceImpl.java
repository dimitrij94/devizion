package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.CustumerService;
import com.mycompany.myapp.domain.Custumer;
import com.mycompany.myapp.repository.CustumerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Custumer.
 */
@Service
@Transactional
public class CustumerServiceImpl implements CustumerService{

    private final Logger log = LoggerFactory.getLogger(CustumerServiceImpl.class);
    
    private final CustumerRepository custumerRepository;

    public CustumerServiceImpl(CustumerRepository custumerRepository) {
        this.custumerRepository = custumerRepository;
    }

    /**
     * Save a custumer.
     *
     * @param custumer the entity to save
     * @return the persisted entity
     */
    @Override
    public Custumer save(Custumer custumer) {
        log.debug("Request to save Custumer : {}", custumer);
        Custumer result = custumerRepository.save(custumer);
        return result;
    }

    /**
     *  Get all the custumers.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Custumer> findAll() {
        log.debug("Request to get all Custumers");
        List<Custumer> result = custumerRepository.findAll();

        return result;
    }

    /**
     *  Get one custumer by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Custumer findOne(Long id) {
        log.debug("Request to get Custumer : {}", id);
        Custumer custumer = custumerRepository.findOne(id);
        return custumer;
    }

    /**
     *  Delete the  custumer by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Custumer : {}", id);
        custumerRepository.delete(id);
    }
}
