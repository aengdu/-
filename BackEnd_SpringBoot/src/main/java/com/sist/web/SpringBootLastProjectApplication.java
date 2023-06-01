package com.sist.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
@ComponentScan(basePackages = {"com.sist.web.dao","com.sist.web.controller","com.sist.web.entity","com.sist.web.news","com.sist.web.config","com.sist.web.member","com.sist.web.security"})
@EnableAspectJAutoProxy // AOP
@SpringBootApplication
public class SpringBootLastProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootLastProjectApplication.class, args);
	}

}
