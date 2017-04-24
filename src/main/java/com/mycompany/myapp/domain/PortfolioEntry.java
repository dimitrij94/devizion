package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PortfolioEntry.
 */
@Entity
@Table(name = "portfolio_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PortfolioEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "photo_uri")
    private String photoUri;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Product portfolio;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoUri() {
        return photoUri;
    }

    public PortfolioEntry photoUri(String photoUri) {
        this.photoUri = photoUri;
        return this;
    }

    public void setPhotoUri(String photoUri) {
        this.photoUri = photoUri;
    }

    public String getDescription() {
        return description;
    }

    public PortfolioEntry description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getPortfolio() {
        return portfolio;
    }

    public PortfolioEntry portfolio(Product product) {
        this.portfolio = product;
        return this;
    }

    public void setPortfolio(Product product) {
        this.portfolio = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PortfolioEntry portfolioEntry = (PortfolioEntry) o;
        if (portfolioEntry.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, portfolioEntry.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PortfolioEntry{" +
            "id=" + id +
            ", photoUri='" + photoUri + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
