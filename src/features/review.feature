Feature: CE Review Player 
  As a user, I should access the course player.

  Scenario: Open the review player 
    Given Opened the url "http://downloads.contentenablers.com/2020/Import_collections/review/Import_Controls_Overview_Hong_Kong_SAR/index.html#/welcome"
    When I click resume or start the course
    Then I see the review player loading  

