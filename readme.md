# Catch Me

This is an Alexa skill to tell me when the next trains leaving my area are. I hope to make it broader, but I'm going to fit my specific use case first.

To build, create a Keys.js file in the root directory of the project and export your API key (or use 'TEST' as a key instead). Then run 'npm run webpack'.

Currently this is super quick and dirty. If you'd like to help out, PRs are appreciated!

## Problems/Opportunities
    [x] only routeId for sound transit (both directions not represented) (40_100479)
    [] store user's preference in dynamodb or something