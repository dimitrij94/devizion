package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

/**
 * Created by Dmitrij on 10.07.2017.
 */
@Entity
@Table(name = "jhi_slide_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SlidePage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "photo_uri")
    private String photoUri;

    @Column(name = "cropped_photo_uri")
    private String croppedPhotoUri;

    @Column(name = "cropped_photo_uri")
    private String description;

    @Column(name = "positioned_left")
    private boolean positionedLeft;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoUri() {
        return photoUri;
    }

    public void setPhotoUri(String photoUri) {
        this.photoUri = photoUri;
    }

    public String getCroppedPhotoUri() {
        return croppedPhotoUri;
    }

    public void setCroppedPhotoUri(String croppedPhotoUri) {
        this.croppedPhotoUri = croppedPhotoUri;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPositionedLeft() {
        return positionedLeft;
    }

    public void setPositionedLeft(boolean positionedLeft) {
        this.positionedLeft = positionedLeft;
    }
}
