package com.cenfotec.dondeEs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cenfotec.dondeEs.contracts.EventPublishResponse;
import com.cenfotec.dondeEs.contracts.EventResponse;
import com.cenfotec.dondeEs.services.EventServiceInterface;

@RestController
@RequestMapping(value = "rest/protected/event")
public class EventController {
	
	@Autowired private EventServiceInterface eventServiceInterface;
	
//	get all
	@RequestMapping(value ="/getAll", method = RequestMethod.GET)
	public EventPublishResponse getAll(){				
		EventPublishResponse response = new EventPublishResponse();
		response.setCode(200);
		response.setCodeMessage("eventsPublish fetch success");
		response.setEventPublishList(eventServiceInterface.getAllEventPublish());
		return response;
	}

}