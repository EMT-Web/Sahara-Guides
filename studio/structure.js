// Studio sidebar: articles grouped by section, plus authors and redirects.
const SECTIONS = [
  ['destinations', 'Destinations'],
  ['sahara-desert', 'Sahara Desert'],
  ['morocco-itineraries', 'Itineraries'],
  ['travel-tips', 'Travel Tips'],
  ['transportation', 'Getting Around'],
  ['culture-food', 'Culture & Food'],
  ['things-to-do', 'Things to Do'],
]

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('All articles')
        .child(S.documentTypeList('article').title('All articles').defaultOrdering([{ field: 'updatedAt', direction: 'desc' }])),
      S.listItem()
        .title('Articles by section')
        .child(
          S.list()
            .title('Sections')
            .items(
              SECTIONS.map(([value, title]) =>
                S.listItem()
                  .title(title)
                  .child(S.documentList().title(title).filter('_type == "article" && category == $c').params({ c: value }))
              )
            )
        ),
      S.listItem()
        .title('Due for review (verified > 6 months ago)')
        .child(
          S.documentList()
            .title('Due for review')
            .filter('_type == "article" && (!defined(verifiedAt) || dateTime(verifiedAt + "T00:00:00Z") < dateTime(now()) - 60*60*24*182)')
        ),
      S.divider(),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('redirect').title('Redirects'),
    ])
