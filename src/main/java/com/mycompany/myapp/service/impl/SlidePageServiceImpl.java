package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.SlidePage;
import com.mycompany.myapp.repository.SlidePageRepository;
import com.mycompany.myapp.service.SlidePageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Dmitrij on 10.07.2017.
 */
@Service()
public class SlidePageServiceImpl implements SlidePageService {

    SlidePageRepository slidePageRepository;

    private final Logger log = LoggerFactory.getLogger(SlidePageServiceImpl.class);

    public SlidePageServiceImpl(SlidePageRepository slidePageRepository) {
        this.slidePageRepository = slidePageRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public SlidePage find(long id) {
        return this.slidePageRepository.findOne(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SlidePage> query() {
        return this.slidePageRepository.findAll();
    }

    @Override
    public void delete(Long slidePageId) {
        this.slidePageRepository.delete(slidePageId);
    }

    @Override
    public SlidePage save(SlidePage pageSlide) {
        return this.slidePageRepository.save(pageSlide);
    }
}
