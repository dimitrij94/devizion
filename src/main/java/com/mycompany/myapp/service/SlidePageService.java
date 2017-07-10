package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.SlidePage;

import java.util.List;

/**
 * Created by Dmitrij on 10.07.2017.
 */
public interface SlidePageService {
    SlidePage find(long id);

    List<SlidePage> query();

    void delete(Long slidePageId);

    SlidePage save(SlidePage pageSlide);
}
