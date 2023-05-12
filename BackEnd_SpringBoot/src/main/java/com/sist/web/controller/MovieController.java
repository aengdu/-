package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sist.web.dao.*;
import com.sist.web.entity.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@RestController
@CrossOrigin("http://localhost:3000")
public class MovieController {
    @Autowired
    private MovieDAO mDao;

    @GetMapping("movie/movie_top9_react")
    public List<MovieEntity> movie_top9(){
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        List<MovieEntity> list = mDao.MovieTop9();
        return list;
    }
}
