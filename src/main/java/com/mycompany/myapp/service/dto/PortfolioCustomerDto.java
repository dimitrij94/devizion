package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.Custumer;

/**
 * Created by Dmitrij on 26.04.2017.
 */

public class PortfolioCustomerDto {
    private Long id;
    private String custumerName;
    private String custumerSurname;
    private String custumerImageUri;

    public PortfolioCustomerDto(Custumer custumer) {
        this.id = custumer.getId();
        this.custumerName = custumer.getCustumerName();
        this.custumerSurname = custumer.getCustumerSurname();
        this.custumerImageUri = custumer.getCustumerImageUri();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustumerName() {
        return custumerName;
    }

    public void setCustumerName(String custumerName) {
        this.custumerName = custumerName;
    }

    public String getCustumerSurname() {
        return custumerSurname;
    }

    public void setCustumerSurname(String custumerSurname) {
        this.custumerSurname = custumerSurname;
    }

    public String getCustumerImageUri() {
        return custumerImageUri;
    }

    public void setCustumerImageUri(String custumerImageUri) {
        this.custumerImageUri = custumerImageUri;
    }
}
