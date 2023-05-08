package com.sist.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.RecipeDAO;
import com.sist.web.entity.JejuFoodEntity;
import com.sist.web.entity.JejuPageVO;
import com.sist.web.entity.RecipeEntity;
import com.sist.web.entity.RecipePageVO;

@RestController
@CrossOrigin("http://localhost:3000")
public class RecipeController {
    @Autowired
    private RecipeDAO dao;

    @GetMapping("recipe/recipe_list_react")
    public List<RecipeEntity> recipe_list(String page)
    {
        if(page==null)
            page="1";
        int curpage=Integer.parseInt(page);
        int rowSize=20;
        int start=(curpage-1)*rowSize;
        List<RecipeEntity> list=dao.recipeListData(start);

        return list;
    }
    @GetMapping("recipe/recipe_page_react")
    public RecipePageVO RecipepageData(String page)
    {
        if(page==null)
            page="1";
        int curpage=Integer.parseInt(page);
        int totalpage=dao.recipeTotalPage();
        final int BLOCK=10;
        int startpage=((curpage-1)/BLOCK*BLOCK)+1;
        int endpage=((curpage-1)/BLOCK*BLOCK)+BLOCK;
        if(endpage>totalpage)
            endpage=totalpage;

        RecipePageVO vo=new RecipePageVO();
        vo.setCurpage(curpage);
        vo.setEndPage(endpage);
        vo.setStartPage(startpage);
        vo.setTotalpage(totalpage);
        return vo;
    }
}