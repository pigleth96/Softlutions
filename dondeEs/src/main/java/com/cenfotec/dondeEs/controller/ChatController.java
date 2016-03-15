package com.cenfotec.dondeEs.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cenfotec.dondeEs.contracts.ChatResponse;
import com.cenfotec.dondeEs.ejb.Chat;
import com.cenfotec.dondeEs.services.ChatServiceInterface;;

@RestController
@RequestMapping(value = "rest/protected/chat")
public class ChatController {

	@Autowired private ChatServiceInterface chatServiceInterface;
	
	@RequestMapping(value ="/createChatUser", method = RequestMethod.POST)
	@Transactional
	public ChatResponse createChatUser(@RequestBody Chat nchat){
		ChatResponse chatResponse = new ChatResponse();
		
		Boolean state = chatServiceInterface.saveChat(nchat);
		
		if(state){
			chatResponse.setCode(200);
		}else{
			chatResponse.setCode(500);
		}
		
		return chatResponse;
	}
}
