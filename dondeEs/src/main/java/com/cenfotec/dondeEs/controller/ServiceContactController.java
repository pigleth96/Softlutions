package com.cenfotec.dondeEs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.cenfotec.dondeEs.contracts.ServiceContactResponse;
import com.cenfotec.dondeEs.ejb.ServiceContact;
import com.cenfotec.dondeEs.services.ServiceContactInterface;

@RestController
@RequestMapping(value = "rest/protected/serviceContact")
public class ServiceContactController {
	
	@Autowired private ServiceContactInterface serviceContactInterface;
	
	/**
	 * @Author Juan Carlos Sánchez G.
	 * @param idEvent Id del evento del que se consultarán los contratos de servicio
	 * @return response Respuesta del servidor de la petición incluyendo la lista de contratos de servicio.
	 * @version 1.0
	 */

	@RequestMapping(value ="/getAllServiceContact/{idEvent}", method = RequestMethod.GET)
	public ServiceContactResponse getAllServiceContact(@PathVariable("idEvent") int idEvent){
		ServiceContactResponse response = new ServiceContactResponse();
		response.setListContracts(serviceContactInterface.getAllServiceContacts(idEvent));
		return response;
	}
	
	/**
	 * @Author Juan Carlos Sánchez G.
	 * @param serviceContact Peticion que contiene la información del contrato de servicio por crear.
	 * @return response Respuesta del servidor de la petición.
	 * @version 1.0
	 */
	
	@RequestMapping(value ="/createServiceContact", method = RequestMethod.POST)
	public ServiceContactResponse createServiceContact(@RequestBody ServiceContact serviceContact){
		ServiceContactResponse response = new ServiceContactResponse();
		Boolean state = serviceContactInterface.saveServiceContact(serviceContact);
		if(state){
			response.setCode(200);
			response.setCodeMessage("Succesfull");
		}else{
			response.setCode(500);
			response.setCodeMessage("Internal error");
		}
		return response;
	}
}