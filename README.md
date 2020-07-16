Note: This repo is largely a snapshop record of bring Wikidata
information in line with Wikipedia, rather than code specifically
deisgned to be reused.

The code and queries etc here are unlikely to be updated as my process
evolves. Later repos will likely have progressively different approaches
and more elaborate tooling, as my habit is to try to improve at least
one part of the process each time around.

---------

Step 0: Create the Position
===========================

As far as I can see, Wikidata doesn't even *have* an item yet for this
position, only the ministry. (Enwiki redirects the minister to the
ministry).

So first thing to do is create it, and tie the two together: 
https://www.wikidata.org/wiki/Q97446369

Step 1: Tracking page
=====================

As such our starding point is a completely blank history, but creating
that early is still useful: https://www.wikidata.org/wiki/Talk:Q97446369

Step 2: Scraper
===============

Comparison/source = https://en.wikipedia.org/wiki/Ministry_for_the_Environment_(New_Zealand)

It's a ministry page rather than a minister page, but it still has a
table with the normal layout, so scraped perfectly first time.

Run as:

    bundle exec ruby scraper.rb | tee wikipedia.csv

Step 3: Get local copy of Wikidata information
==============================================

usually this would involve running a standard SPARQL query:

    wd sparql office-holders.js Q97446369 | tee wikidata.json

But here we know we don't already have any so, instead:

    echo "[]" > wikidata.json

Step 4: Create missing P39s
===========================

    bundle exec ruby new-P39s.rb wikipedia.csv wikidata.json |
      wd ee --batch --summary "Add missing P39s from https://en.wikipedia.org/wiki/Ministry_for_the_Environment_(New_Zealand)"

Step 5: Add missing qualifiers
==============================

Again, with no existing statements, we've nothing to add, so can skip
this stage.

Step 6: Refresh the Tracking Page
=================================

We finish with: https://www.wikidata.org/w/index.php?title=Talk:Q97446369&oldid=1232584040

