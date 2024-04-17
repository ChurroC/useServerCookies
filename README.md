# useStickyServerState
Bases of cookies for nextjs this library allows you to not only get and set cookies it also lets you get the clients cookie on the server. This allows you to not have to wait for the page to rehydrate before using a useeffect to sync up state but instead allows the server to know what cookies are sent and allow you to use them.

basically have an overawching orovider
then getCookie with cookie name as param which outputs [cookie, setcookie] maybe add a dlete cokkie
for the set cookie have param asa object
try to use cookeistore api but defuskt to docuemntcookie if not
