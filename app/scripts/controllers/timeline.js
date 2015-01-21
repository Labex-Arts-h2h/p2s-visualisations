'use strict';

/**
 * @ngdoc function
 * @name p2sAppApp.controller:TimelineCtrl
 * @description
 * # TimelineCtrl
 * Controller of the p2sAppApp
 */
angular.module('p2sAppApp')
  .controller('TimelineCtrl', function ($scope) {

$scope.timelineData = 
{
    "timeline":
    {
        "headline":"Patrimoine du Spectacle",
        "type":"default",
		"text":"Timeline",
		"startDate":"1785,01,01",
        "date": [{"headline":"Palais Royal","startDate":"1785,01,01","text":"Le théâtre du Palais-Royal est une salle de spectacles parisienne située 38, rue de Montpensier (1er arr.) et donnant sur les jardins du Palais-Royal.","asset":{"media":"http://37.187.43.239:5000/images/assets/theatre-royal.jpg"}},{"headline":"Salle Ventadour","startDate":"1829,04,20","asset":{"media":"http://37.187.43.239:5000/images/assets/ventadour.jpg"}},{"headline":"Louvois","startDate":"1791,01,01","endDate":"1820,10,08","text":"Le théâtre Louvois est une ancienne salle de spectacles parisienne située au 6, rue de Louvois, dans le 2 arrondissement. Inaugurée en 1791","asset":{"image":"http://37.187.43.239:5000/images/assets/theatre-louvois.jpg"}},{"headline":"Théatre de Variétés","startDate":"1807,10,09","asset":{"media":"http://37.187.43.239:5000/images/assets/theatre-varietes.jpg"}},{"headline":"La Dame aux Camélias","startDate":"1852,10,08","text":"Drame","asset":{"media":"http://37.187.43.239:5000/images/assets/camelias.jpg"}},{"headline":"Divorçons","startDate":"1880,12,06","text":"Comédie en 3 actes","asset":{"media":"http://37.187.43.239:5000/images/assets/divorcons.jpg"}},{"headline":"La Vestale","startDate":"1807,12,15","text":"La Vestale est un opéra en trois actes de Gaspare Spontini, sur un livret d’Étienne de Jouy, créé à Paris 15 décembre 1807, puis en version allemande à Vienne en 1810, et en version italienne à Naples, le 8 septembre 1811.","asset":{"media":"http://37.187.43.239:5000/images/assets/vestale.jpg"}},{"headline":"La vie Parisienne","startDate":"1866,10,31","text":"Opéra-Bouffe en 5 actes puis en 4 actes","asset":{"media":"http://37.187.43.239:5000/images/assets/vieparisienne.jpg"}},{"headline":"Un fil à la Patte","startDate":"1894,01,09","text":"Comédie en 3 actes","asset":{"media":"http://37.187.43.239:5000/images/assets/unfilalapatte.jpg"}},{"headline":"La Grande Duchesse de Gérolstein","startDate":"1866,01,12","endDate":"1870,01,12","text":"Opéra Bouffe en trois Actes de Meilhac, Halévy et Offenbach pour le Théâtre des Variétés","asset":{}},{"headline":"Marc Michel"},{"headline":"Henri Meilhac"},{"headline":"Ludovic Helevy"},{"headline":"Lassouche"},{"headline":"Francis de Plumkett (dit Fleury)"},{"headline":"Léon Dormeuil"},{"headline":"Les frères Goncours"},{"headline":"Albert Brasseur"},{"headline":"Hyacinth (Louis Duflost)"},{"headline":"Gil Pérès"},{"headline":"Zulma Bouffar (Madeleine Boufflar)"},{"headline":"C Montaland"},{"headline":"Thierrel (LA) Félicia"},{"headline":"Massin (Louise)"},{"headline":"Sarah Bernardt"},{"headline":"Jules Brasseur"},{"headline":"Dumas Fils"},{"headline":"Jules De Goncourt"},{"headline":"Edmond De Goncourt"},{"headline":"Jacques Offenbach"},{"headline":"Napoléon III"}]
    }
}


  });
