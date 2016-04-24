package com.cenfotec.dondeEs.services;


import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.web.multipart.MultipartFile;

import com.cenfotec.dondeEs.ejb.Event;
import com.cenfotec.dondeEs.pojo.EventPOJO;

public interface EventServiceInterface {
	
	List<EventPOJO> getAllEventByUser(int pidUsuario);
	
	Event getEventById(int idEvent);
	
	/***
	 * Guarda un evento.
	 * @author Enmanuel García González
	 * @return True en caso de efectuarse la inserción o false en caso contrario.
	 * @version 1.0
	 */
	int saveEvent(Event e);
	
	EventPOJO eventById(int idEvent);
	
	/**
	 * Prepublica el evento, cierra las subastas pendientes, crea el chat y cancela los contratos pendientes
	 * @Autor Ernesto Mendez A.
	 * @param eventId id del evento a validar prepublicacion
	 * @return si la operacion fue exitosa
	 * @Version 1.0
	 */
	boolean prepublishEvent(int eventId);
	
	/**
	 * Notifica la publicacion del evento tanto a los participantes como a sus contribuyentes
	 * @author Ernesto Mendez A.
	 * @param event evento a notificar
	 * @version 1.0
	 */
	void publishEventNotification(Event event);
	
	/***
	 * Obtiene todos los eventos publicados.
	 * @author Enmanuel García González
	 * @version 1.0
	 */
	List<EventPOJO> getAllEventPublish();
	/**
	 * @author Antoni Ramirez Montano
	 * @param nameUser criterio de busqueda
	 * @param name criterio de busqueda
	 * @param namePlace criterio de busqueda
	 * @return lista segun el o los criterios
	 */
	List<EventPOJO> getAllByParam(String nameUser, String name, String namePlace, byte state);
	
	/**
	 * @auctor Ernesto Mendez A.
	 * @param e Eventoa modificar
	 * @return retorna true si la operacion fue exitosa, false si no
	 */
	boolean editEvent(Event e, MultipartFile imgFile, ServletContext servletContext);
	
	/**
	 * @author Ernesto Mendez A.
	 * @param top cantidad de items que retorna la lista
	 * @return Lista de eventos con mas participantes
	 */
	List<EventPOJO> getTopEventsByParticipants(int top);
}