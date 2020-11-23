 Feature: General APIs
   As a user, I should access the course player and lms. 

#	Scenario: Once I login to learner.contentenablres.com 
#		Given The userinfo with <id> exist
#		When I send GET request to '/api/user/info'
#		Then I receive respose

#		Examples:
#			| id |
#			#| 10046 | 
#			#| 10047 |
#			| 1 |
#			| 2 |

	Scenario: Once Learner login to learner.contentenablres.com 
    	Given credentitals to login in lms "ben.w@contentenablers.com" and "test1234"
		When I send request to get learner information
		Then I receive response on
