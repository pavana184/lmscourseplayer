 Feature: General APIs
   As a user, I should access the course player and lms. 

	Scenario: Once I login to learner.contentenablres.com 
		Given The userinfo with <id> exist
		When I send GET request to '/api/user/info'
		Then I receive respose

		Examples:
			| id |
			#| 10046 | 
			#| 10047 |
			| 1 |
			| 2 |
  