package com.sist.web.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="movie")
@Getter
@Setter
public class MovieEntity {
    @Id
    private int no;
    private String image;
    private String title;
    private String type;
    private String rating;
    private String platform;
    private int hit;
}
