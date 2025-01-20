package com.rrr.teacher;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.ai.ollama.api.OllamaApi.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.model.ModelOptions;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.ai.ollama.api.OllamaApi.ChatRequest;
import org.springframework.ai.ollama.api.OllamaApi.Message;
import org.springframework.ai.ollama.api.OllamaApi.Message.Role;
import org.springframework.ai.chat.messages.UserMessage;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ChatController {

    private final OllamaChatModel ollamaChatModel;
    private boolean firstSentence = true;

    @Autowired
    public ChatController(OllamaChatModel ollamaChatModel) {
        this.ollamaChatModel = ollamaChatModel;
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        // Extract parameters from the request
        String language = request.get("language");
        String level = request.get("level");
        String userPrompt = request.get("userPrompt");

        // System and agent prompts
        // String systemPrompt = "You are a language teacher.";
        // String agentPrompt = "Help the user learn " + language + " at " + level + " level.";
        String systemPrompt = "I want you to act as a spoken "+ language + " "+ level+" teacher and improver. I will speak to you in "+ language + " and you will reply to me in "+ language + " to practice my spoken "+ language + ". I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors.";
        String agentPrompt = "I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.";
        /*
         * I want you to act as a spoken English teacher and improver. 
         * I will speak to you in English and you will reply to me in English to practice my spoken English. 
         * I want you to keep your reply neat, limiting the reply to 100 words. 
         * I want you to strictly correct my grammar mistakes, typos, and factual errors. 
         * I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. 
         * Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.
         */

        // Call the OllamaChatModel
        String responseMessage = callOllamaChatModel(systemPrompt, agentPrompt, userPrompt);

        // Prepare the response
        Map<String, String> response = new HashMap<>();
        response.put("response", responseMessage);
        return ResponseEntity.ok(response);
    }

    private String callOllamaChatModel(String systemPrompt, String agentPrompt, String userPrompt) {
        // Use the OllamaChatModel to get a response
        // return ollamaChatModel.chat(systemPrompt, agentPrompt, userPrompt);
        String sent = "";
        if (firstSentence) {
            sent = systemPrompt+","+agentPrompt+","+userPrompt;
            firstSentence = false;
            } else {
                sent = userPrompt;
                }
        // var userMsg = new UserMessage(systemPrompt+","+agentPrompt+","+userPrompt);
        var userMsg = new UserMessage(sent);
        // System.err.println("content=== "+userMsg.getContent());
        var prompt = new Prompt(userMsg,
        OllamaOptions.builder().withModel("phi3.5:latest").build());
        // OllamaOptions.builder().withModel("qwen2.5:3b").build());
        //var prompt = new Prompt(systemPrompt+","+agentPrompt+","+userPrompt);
        var response = ollamaChatModel.call(prompt);
        return response.getResult().getOutput().getContent();

    }
}
