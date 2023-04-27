### Regex for firstname, lastname:

// should contain at least 3 from the mentioned characters
// should contain space, lowercase, uppercase.

### Regex for email:

The domain name [for example com, org, net, in, us, info] part contains letters, digits, hyphens, and dots.

Example of valid email id

    mysite@ourearth.com
    my.ownsite@ourearth.org
    mysite@you.me.net

Example of invalid email id

    mysite.ourearth.com [@ is not present]
    mysite@.com.my [ tld (Top Level domain) can not start with dot "." ]
    @you.me.net [ No character before @ ]
    mysite123@gmail.b [ ".b" is not a valid tld ]
    mysite@.org.org [ tld can not start with dot "." ]
    .mysite@mysite.org [ an email should not be start with "." ]
    mysite()*@gmail.com [ here the regular expression only allows character, digit, underscore, and dash ]
    mysite..1234@yahoo.com [double dots are not allowed]

### Regex for password: /^(?=._\d)(?=._[a-z])(?=.\*[A-Z]).{8,}$/

/^
(?=._\d) // should contain at least one digit
(?=._[a-z]) // should contain at least one lower case
(?=.\*[A-Z]) // should contain at least one upper case
.{8,}$ // should contain at least 8 from the mentioned characters
$/
