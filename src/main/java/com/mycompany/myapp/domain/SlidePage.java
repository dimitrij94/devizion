package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SlidePage.
 */
@Entity
@Table(name = "slide_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SlidePage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "cropped_photo_uri")
    private String croppedPhotoUri;

    @Column(name = "positioned_left")
    private Boolean positionedLeft;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public SlidePage photoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
        return this;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getDescription() {
        return description;
    }

    public SlidePage description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCroppedPhotoUri() {
        return croppedPhotoUri;
    }

    public SlidePage croppedPhotoUri(String croppedPhotoUri) {
        this.croppedPhotoUri = croppedPhotoUri;
        return this;
    }

    public void setCroppedPhotoUri(String croppedPhotoUri) {
        this.croppedPhotoUri = croppedPhotoUri;
    }

    public Boolean isPositionedLeft() {
        return positionedLeft;
    }

    public SlidePage positionedLeft(Boolean positionedLeft) {
        this.positionedLeft = positionedLeft;
        return this;
    }

    public void setPositionedLeft(Boolean positionedLeft) {
        this.positionedLeft = positionedLeft;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SlidePage slidePage = (SlidePage) o;
        if (slidePage.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, slidePage.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SlidePage{" +
            "id=" + id +
            ", photoUrl='" + photoUrl + "'" +
            ", description='" + description + "'" +
            ", croppedPhotoUri='" + croppedPhotoUri + "'" +
            ", positionedLeft='" + positionedLeft + "'" +
            '}';
    }
}
