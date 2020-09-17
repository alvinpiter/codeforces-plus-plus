# Codeforces++

Link: http://cf-pp.herokuapp.com/

Codeforces++ is a web application that extends [Codeforces](https://codeforces.com) functionality. It is built using React and Codeforces API.

## Features

Here are the features Codeforces++ offers

### Problems
User can input their handle and get a list of personalized problems. User can then filter the problems using following parameters:
* Whether user has attempted or solved a problem. Attempted problems will have red background on the table, while solved problems will have green background.
* Range of contest ID
* Range of problem rating
* Set of problem tags. Specified problem tags can be conjuncted using `AND` or `OR`. If tags are conjuncted using `AND`, then the problem must have all the specified tags. If tags are conjuncted using `OR`, then the problem must have at least one of the specified tags.

In addition to filtering problems, user can also sort the filter result. To sort, just hover over a field in table header. User can sort the result based on following fields:
* Contest ID
* Problem rating
* Number of users who have solved a problem

![Problems page](https://github.com/alvinpiter/codeforces-plus-plus/blob/master/public/screenshots/problems.png)

### Compare
It's common to have a rival in competitive programming, hence Codeforces++ offers a performance comparison feature. When comparing 2 users, Codeforces++ will show:
* List of problems solved by one user but not by the other.
* List of contests where those 2 users competed together.

![Compare page](https://github.com/alvinpiter/codeforces-plus-plus/blob/master/public/screenshots/compare.png)

![Common contests](https://github.com/alvinpiter/codeforces-plus-plus/blob/master/public/screenshots/common_contests.png)

### Standings
Codeforces++ standings extends Codeforces standings in following ways:
* It shows users' rating change
* Filter the rows by contestants' handle or name
* Filter the rows by contestants' country

You can use these features if you want to compare your performance with users from particular country.

![Standings page](https://github.com/alvinpiter/codeforces-plus-plus/blob/master/public/screenshots/standings.png)

## Deployment
This app is currently deployed on Heroku by following [this](https://blog.heroku.com/deploying-react-with-zero-configuration) guide.
