'use strict';

// Setting up route
angular.module('persona').config(['$stateProvider',
	function ($stateProvider) {

		// Check if user has role
		var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

			// Initialize a new promise
			var deferred = $q.defer();

			// ver-personas
			if (Auth.authz.hasResourceRole(role, 'persona')) {
				$timeout(deferred.resolve);
			}

			// Not ver-personas
			else {
				$timeout(deferred.reject);
				//$location.url('/auth/login');
				alert('No tiene los permisos para poder acceder a esta pagina');
			}

			return deferred.promise;
		};

		$stateProvider
			.state('persona', {
				abstract: true,
				url: '/persona',
				templateUrl: '/modules/persona/views/_body.html',
				controller: 'PersonaController'
			})
			.state('persona.home', {
				url: '/home',
				templateUrl: '/modules/persona/views/index.html'
			})
			.state('persona.app', {
				url: '/app',
				templateUrl: '/modules/persona/views/app.html'
			})

			.state('persona.app.personas', {
				url: '/personas',
				template: '<div ui-view></div>'
			})
			.state('persona.app.administracion', {
				url: '/administracion',
				template: '<div ui-view></div>'
			})

			//tipoDocumento
			.state('persona.app.administracion.buscarTipoDocumento', {
				url: '/buscarTipoDocumentos',
				templateUrl: '/modules/persona/views/tipoDocumento/form-buscar-tipoDocumento.html',
				controller: 'Persona.TipoDocumento.BuscarTipoDocumentoController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('persona.app.administracion.crearTipoDocumento', {
				url: '/tipoDocumento',
				templateUrl: '/modules/persona/views/tipoDocumento/form-crear-tipoDocumento.html',
				controller: 'Persona.TipoDocumento.CrearTipoDocumentoController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('persona.app.administracion.editarTipoDocumento', {
				url: '/tipoDocumento/:id',
				templateUrl: '/modules/persona/views/tipoDocumento/form-editar-tipoDocumento.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					},
					tipoDocumento: function ($state, $stateParams, SGTipoDocumento) {
						return SGTipoDocumento.$find($stateParams.id);
					}
				},
				controller: 'Persona.TipoDocumento.EditarTipoDocumentoController'
			})

			//Personas
			.state('persona.app.personas.buscarPersonaNatural', {
				url: '/buscarPersonaNatural',
				templateUrl: '/modules/persona/views/natural/form-buscar-personaNatural.html',
				controller: 'Persona.Natural.BuscarPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaNatural', {
				url: '/natural?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/persona/views/natural/form-crear-personaNatural.html',
				controller: 'Persona.Natural.CrearPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural', {
				url: '/natural/{id:[0-9]{1,8}}',
				templateUrl: '/modules/persona/views/natural/form-editar-personaNatural.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaNatural: function ($state, $stateParams, SGPersonaNatural) {
						return SGPersonaNatural.$find($stateParams.id);
					}
				},
				controller: 'Persona.Natural.EditarPersonaNaturalController'
			}).state('persona.app.personas.editarPersonaNatural.resumen', {
				url: '/resumen',
				templateUrl: '/modules/persona/views/natural/form-editar-resumen.html',
				controller: 'Persona.Natural.EditarPersonaNatural.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/persona/views/natural/form-editar-datosPrincipales.html',
				controller: 'Persona.Natural.EditarPersonaNatural.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural.datosAdicionales', {
				url: '/adicionales',
				templateUrl: '/modules/persona/views/natural/form-editar-datosAdicionales.html',
				controller: 'Persona.Natural.EditarPersonaNatural.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('persona.app.personas.buscarPersonaJuridica', {
				url: '/juridica/buscar',
				templateUrl: '/modules/persona/views/juridica/form-buscar-personaJuridica.html',
				controller: 'Persona.Juridica.BuscarPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica', {
				url: '/juridica?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/persona/views/juridica/form-crear-personaJuridica.html',
				controller: 'Persona.Juridica.CrearPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/persona/views/juridica/form-crear-datosPrincipales.html',
				controller: 'Persona.Juridica.CrearPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica.representante', {
				url: '/representante',
				templateUrl: '/modules/persona/views/juridica/form-crear-representante.html',
				controller: 'Persona.Juridica.CrearPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('persona.app.personas.editarPersonaJuridica', {
				url: '/juridica/{id:[0-9]{1,8}}',
				templateUrl: '/modules/persona/views/juridica/form-editar-personaJuridica.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaJuridica: function ($state, $stateParams, SGPersonaJuridica) {
						return SGPersonaJuridica.$find($stateParams.id);
					}
				},
				controller: 'Persona.Juridica.EditarPersonaJuridicaController'
			}).state('persona.app.personas.editarPersonaJuridica.resumen', {
				url: '/resumen',
				templateUrl: '/modules/persona/views/juridica/form-editar-resumen.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/persona/views/juridica/form-editar-datosPrincipales.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.datosAdicionales', {
				url: '/adicionales',
				templateUrl: '/modules/persona/views/juridica/form-editar-datosAdicionales.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.representante', {
				url: '/representante',
				templateUrl: '/modules/persona/views/juridica/form-editar-representante.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.crearAccionista', {
				url: '/accionista',
				templateUrl: '/modules/persona/views/juridica/form-editar-accionistas.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.AccionistasController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			});
	}
]);
