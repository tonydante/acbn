
	// config.js
	
	// Calculators are defined as PHP classes.
	
	var calcTheme = {
		fiType: siteSettings.fiType,
		primaryColor: '#0e4ca1',
		primaryText: '',
		secondaryColor: '',
		secondaryText: '',
		icon: '/custom/_templateSECONDBranch/calculators/local/images/icon.png'
	};
	
	
	var rewardChecking = {
		type: "reward-checking",
		name: "Kasasa Cash",
		tier1Rate: ".0200",
		tier1Cap: "10000",
		tier2Rate: ".0010",
		maxAtmRefunds: "25",
		averageAtmFee: "3.00",
		learnMoreLink: '/accounts/personal-checking/free-kasasa-cash-checking.html',
		questionsLink: '/about-us/contact-us.html'
	};
	
	
	var buyVsLease = {
		type: "buy-vs-lease-responsive",
		learnMoreLink: '/loans/personal-loans/auto-loans.html',
		questionsLink: '/about-us/contact-us.html'
	};
	
	var savingsGoal = {
		type: "savings-goal",
		learnMoreLink: '/accounts/personal-savings/',
		questionsLink: '/about-us/contact-us.html',
		ratesLink: '/rates.html#savings-accounts'
	}
	
	var cd = {
		type: "cd",
		learnMoreLink: '/accounts/personal-savings/share-certificates.html',
		questionsLink: '/about-us/contact-us.html',
		ratesLink: '/rates.html#certificates'
	}
	
	var simpleLoan = {
		type: "simple-loan",
		learnMoreLink: '/loans/personal-loans/personal-loans.html',
		questionsLink: '/about-us/contact-us.html',
		ratesLink: '/rates.html'
	}
	
	var mortgageLoan = {
		type: "mortgage-loan",
		learnMoreLink: '/loans/personal-loans/home-mortgage-loans.html',
		questionsLink: '/about-us/contact-us.html',
		disclosuresLink: '/disclosures.html',
		ratesLink: '/rates.html'
	}
	
	var calcList = [rewardChecking, buyVsLease, savingsGoal, cd, simpleLoan, mortgageLoan];
	