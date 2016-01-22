if ( window.MDN == undefined ) { MDN = {}; }
MDN.index = function() {
	var self = this;
	this.init = function() {
		$('#mdn-menubar').jdMenuTree(MDN.menuObject);
		$('#mdn-notepad').tabs();
	};
	this.addMenubarStyle = function() {
		
	};
	
};


$(function(){
	new MDN.index().init();
});




MDN.menuObject = 
[

{
	Menu: 'Work',
	Note: [
	    '',
	    '',
	    '',
	    '',
	    ''
	],
	ChildMenu : [
		{
			Menu: 'Rates',
			Note: [
			    '',
			    '',
			    '',
			    '',
			    ''
			],
			ChildMenu : [
			]
		}
	]
},
{
	Menu: 'J2EE',
	Note: [
	    '',
	    '',
	    '',
	    '',
	    ''
	],
	ChildMenu : [
		{
			Menu: 'DataBase',
			Note: [
			    '',
			    '',
			    '',
			    '',
			    ''
			],
			ChildMenu : [
				{
					Menu: 'Orcale',
					Note: [
					    '',
					    '',
					    '',
					    '',
					    ''
					],
					ChildMenu : [
					]
				},
				{
					Menu: 'MySql',
					Note: [
					    '',
					    '',
					    '',
					    '',
					    ''
					],
					ChildMenu : [
					]
				}
			]
		},
		{
			Menu: 'Java',
			Note: [
			    '',
			    '',
			    '',
			    '',
			    ''
			],
			ChildMenu : [
				{
					Menu: 'SSH',
					Note: [
					    '',
					    '',
					    '',
					    '',
					    ''
					],
					ChildMenu : [
						{
							Menu: 'Spring',
							Note: [
							    '',
							    '',
							    '',
							    '',
							    ''
							],
							ChildMenu : [
							             
							]
						}
					]
				}
			]
		}
	]
}

];
