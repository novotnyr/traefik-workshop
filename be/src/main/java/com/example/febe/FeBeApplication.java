package com.example.febe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class FeBeApplication {
    @GetMapping("/greetings")
    public List<String> greetings() {
        return List.of("Hello", "Hallo", "Hola");
    }

	public static void main(String[] args) {
		SpringApplication.run(FeBeApplication.class, args);
	}

}
