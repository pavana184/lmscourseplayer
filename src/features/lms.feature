Feature: CE LMS features for learners
  As a user, I want to login as a Learner.

  Scenario: Authenticting into LMS
    Given I am on login page
    When I login using credentitals "pavana@contentenablers.com" and "pavana@contentenablers.com"
    Then I see the login success landing page title "Content Enablers Inc : Compliance Training"

  Scenario: Inside LMS Home page
    Given Opened Home page "Content Enablers Inc : Compliance Training"
    And Closed quick tour
    When I search the course name "Dell: Norway Export Controls"
    Then I see the course player loading 

  Scenario: Player home page 
    Given Player home page loaded "resources.contentenablers.com"
    When I start or resume the course
    Then I see selected topic playing 
	
  Scenario: Video player page
	When File begins to play 
	Then Enable dragging to drag the file
	Then Wait until the course is completed
	Then Check the completion percent
	