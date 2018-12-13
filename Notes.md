Notes: 
- goal = post 1 image, return recomended images (from the 20 images)
- scaleability? 20 images ? 1000000 images?

plan:
- [x] git init (track versions)

- [x] find out how current code works => plantImageUrl gets location for images, other code creates json from Google Vision
  - changed to arrow functions

- [x] get images and json locally (save API calls)
- [x] scrub json to find interesting info
  - info about json found here (https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#EntityAnnotation)
    - important info is inside "**labelAnnotation**"
      - **mid**: entity ID, some ID, some ID's can cross reference Google Knowledge Graph
      - **description**: text description
      - **score**: overall score on result range[0, 1]
      - **topicality**: relevancy to picture (e.g. high if "tower" and image "Eiffel Tower") 
        - only thing that is effecting score, thus is same value as score
  
  - [object] in "labelAnnotation" are sorted by score!

- [x] Data filter to only get relevant information, and only store relevant info
  - Keeping "labelAnnotatons" (todo: remove attributes that are not in use)
  - storing "imageUrl" for easy access for output..

- [x] recommendation system parts
  - [x] topN filtering
    - [x] filter for top N and recommend images that have a value from the top 3
    - [x] recommend 1 item when compared to input (min)
    - [x] recommend list of items when compared to input
      - [x] how to store data? Currently via files long term (better would be DB), hashmap cache short term -> using associative array (acts as hashmap O(1) because know index/keys (urls)).

- [x] starting system
  - [x] take users arguments
  - [x] add more hyper-parameters when planning out a variable scoped recommending system (that includes whole list, not just top three)
    - [x] split description String's when more than 1 word (more chances for matching other descriptions then!)

- [x] Testing
  - [x] separate codebase into specialised files (mostly done, but will continue)
  - [x] mocha and chai testing! Test each function!

- [ ] RamdaJS (Time Constraints)
  - [ ] Auto curry functions + lots of areas to compose!
  - [ ] look into Ramda + Promises (there are no Task functors (or any other functors) in Ramda) => pipeP, composeP?
  - [ ] Async fileread and writes (IO), and networking.

- [ ] Frontend (Time Constraints)

-----

O notation of application:
- O(n) time complexity when storing and retrieving data -> if using hashmap to store (O(n) and retrieve data (O(1)) (short term cache), or DB (no time for)/filewriting & reading (O(n))

- O(n^2) bruteforce if using variable recommendation system (all descriptors), O(n^2)< n < O(n) when picking topN recommendation system.
  - hash O(1) retrieval or break out once a match is found?
  - lazy loading? User only needs x amount when first loaded.

- O(n) space complexity if storing JSON response, much less if constant API calls each time to retrieve data (slow!)

-----

This problem is:
- either a classification/regression system using Google Vision API docs OR
- recommendation system using data gathered.
  - LOOKING AT RESULTING JSON, CAN CREATE A RECOMMENDATION SYSTEM WITH THIS.