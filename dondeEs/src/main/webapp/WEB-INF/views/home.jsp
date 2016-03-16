<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" ng-app="dondeEs" class="no-js">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Donde es | Inicio</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link
	href="resources/bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css"
	rel="stylesheet">
<link href="resources/font-awesome/css/font-awesome.css"
	rel="stylesheet">
<link href="resources/css/plugins/iCheck/custom.css" rel="stylesheet">
<link href="resources/css/animate.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link href="resources/css/eventsPublishStyle.css" rel="stylesheet">
<link href="resources/css/plugins/steps/jquery.steps.css" rel="stylesheet">
<link href="resources/bower_components/toastr/toastr.css" rel="stylesheet">
</head>
<body>
	<div id="wrapper">
		<nav class="navbar-default navbar-static-side" role="navigation">
			<div class="sidebar-collapse">
				<ul class="nav metismenu" id="side-menu">
					<li class="nav-header">
						<div class="dropdown profile-element" ng-controller="IndexCtrl">
							<span> <img alt="image" class="img-circle"
								src="http://lorempixel.com/32/32" />
							</span> <a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<span class="clear"> <span class="block m-t-xs"> <strong
										class="font-bold">{{loggedUser.name}}
											{{loggedUser.lastName}}</strong>
								</span> <span class="text-muted text-xs block">{{loggedUser.role.name}}<b
										class="caret"></b></span>
							</span>
							</a>
							<ul class="dropdown-menu animated fadeInRight m-t-xs">
								<li><a href="#">Profile</a></li>
								<li><a href="#">Contacts</a></li>
								<li><a href="#">Mailbox</a></li>
								<li class="divider"></li>
								<li><a href="#">Logout</a></li>
							</ul>
						</div>
						<div class="logo-element">IN+</div>
					</li>
					<li><a href="#"><i class="fa fa-th-large"></i> <span
							class="nav-label">Eventos</span> <span class="fa arrow"></span></a>
						<ul class="nav nav-second-level collapse">
							<li><a href="#">Mis eventos</a></li>
						</ul></li>
					<li><a href="#"><i class="fa fa-bar-chart-o"></i> <span
							class="nav-label">Reportes</span><span class="fa arrow"></span></a>
						<ul class="nav nav-second-level collapse">
							<li><a href="#">Reporte x</a></li>
							<li><a href="#">Reporte x</a></li>
						</ul></li>
						<li><a href="#"><i class="fa fa-user"></i> <span
							class="nav-label">Usuarios</span><span class="fa arrow"></span></a>
						<ul class="nav nav-second-level collapse">
							<li><a href="/dondeEs/app#/users">Lista de usuarios</a></li>
						</ul></li>
					<li><a href="#"><i class="fa fa-envelope"></i>
							<span class="nav-label">Notificaciones </span><span
							class="label label-warning pull-right">n/x</span></a>
						<ul class="nav nav-second-level collapse">
							<li><a href="#">Inbox</a></li>
						</ul></li>
					<li><a href="#"><i class="fa fa-shopping-cart"></i> <span
							class="nav-label">Servicios</span><span class="fa arrow"></span></a>
						<ul class="nav nav-second-level collapse">
							<li><a href="#">Mis servicios</a></li>
						</ul></li>
				</ul>

			</div>
		</nav>
		<div id="page-wrapper" class="gray-bg">
			<div class="row border-bottom">
				<nav class="navbar navbar-static-top white-bg" role="navigation"
					style="margin-bottom: 0"></nav>
			</div>
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="row">
					<div ng-view></div>
				</div>
			</div>
			<div class="footer">
				<div class="pull-right"></div>
				<div>
					<strong>Copyright</strong> Softlutions &copy; 2016
				</div>
			</div>
		</div>
	</div>

	<!-- Mainly scripts -->
	<script src="resources/js/jquery-2.1.1.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<script src="resources/js/plugins/metisMenu/jquery.metisMenu.js"></script>
	<script src="resources/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

	<!-- Custom and plugin javascript -->
	<script src="resources/js/inspinia.js"></script>
	<script src="resources/js/plugins/pace/pace.min.js"></script>

	<!-- JQueryUI -->
	<script src="resources/bower_components/jquery-ui/jquery-ui.js"></script>


	<script src="resources/bower_components/angular/angular.js"></script>
	<script src="resources/bower_components/angular-route/angular-route.js"></script>
	<script src="resources/bower_components/jquery.steps/build/jquery.steps.min.js"></script>
	<script src="resources/bower_components/toastr/toastr.js"></script>
	<script src="resources/js/App/App.js"></script>
	
	<!-- Steps -->
    <script src="resources/js/plugins/staps/jquery.steps.min.js"></script>
    
    <!-- Jquery Validate -->
    <script src="resources/js/plugins/validate/jquery.validate.min.js"></script>
	
	<script src="resources/js/index/index.js"></script>
	<script src="resources/js/users/usersController.js"></script>
	<script src="resources/js/Contracts/ContractsCtrl.js"></script>
	<script src="resources/js/myEvents/myEventsController.js"></script>
	<script src="resources/js/ServicesByUsers/ServicesByUserController.js"></script>
	<script src="resources/js/Events/eventsPublishController.js"></script>
	<script src="resources/js/AnswerInvitation/answerInvitation.js"></script>
	<script src="resources/js/AnswerContract/AnswerContractController.js"></script>
	<script src="resources/js/Commons/Filters.js"></script>
	<script src="resources/js/Auction/auctionController.js"></script>
	<script src="resources/js/Auction/ListAuctionsController.js"></script>
	<script src="resources/js/Chat/ChatController.js"></script>
	<!-- Morris -->
    <script src="resources/js/plugins/morris/raphael-2.1.0.min.js"></script>
    <script src="resources/js/plugins/morris/morris.js"></script>
</body>
</html>