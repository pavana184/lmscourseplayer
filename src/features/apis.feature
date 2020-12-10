 Feature: General APIs
   As a user, I should access the course player and lms. 

#	Scenario: Once I login to learner.contentenablres.com 
#		Given The userinfo with <id> exist
#		When I send GET request to '/api/user/info'
#		Then I receive respose
#
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
		
	Scenario: Once Learner login to learner.contentenablres.com 
		Given credentitals to login in lms1 "ben.w@contentenablers.com" and "test1234"
		When I send the request to course player
		Then I get the player response
		When I send request to get the notes,updates,vignettes 40
		Then I get the updateNotesPoster by ID
		When I send the request to get the permawidget text 3617
		Then I get the response
		When I send the request to get coursematrix 40
		Then Get the coursematrix strig
		When I send the request to get the course configuration 40
		Then I get the course details

