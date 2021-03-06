module.exports = (id, startdate, enddate, replaces, replacedby, ordinal) => {
  const qualifiers = { }

  // Seems like there should be a better way of filtering these...
  if (startdate && startdate != "''")   qualifiers['P580']  = startdate
  if (enddate && enddate != "''")       qualifiers['P582']  = enddate
  if (replaces && replaces != "''")     qualifiers['P1365'] = replaces
  if (replacedby && replacedby != "''") qualifiers['P1366'] = replacedby
  if (ordinal && ordinal != "''")       qualifiers['P1545'] = ordinal

  if (startdate && enddate && startdate != "''" && enddate != "''" &&
    (startdate > enddate)) throw new Error(`Invalid dates: ${startdate} / ${enddate}`)

  return {
    id,
    claims: {
      P39: {
        value: 'Q97446369', // position held: Environment Minister of New Zealand
        qualifiers: qualifiers,
        references: {
          P143: 'Q328', // enwiki
          P4656: 'https://en.wikipedia.org/wiki/Ministry_for_the_Environment_(New_Zealand)'
        },
      }
    }
  }
}
