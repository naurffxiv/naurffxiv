# Overview

This README's purpose is to provide documentation on the markdown page system on this repository.
This system's main goal is to:

- Generate pages at arbitrary slugs
- Point a slug to a specific MDX file
- Provide metadata to populate a quick links sidebar

All of the logic for handling the files is located in `@/app/[difficulty/[[...slug]]]`.

# Setup

1. MDX files must be placed within a subfolder in the `@/markdown/` folder. For example, `@/markdown/ultimate/`.
2. The folder be added to the `markdownFolders` const in `@/app/constants.js`.
3. A `_meta.json` file must be created to create a map between a slug and an MDX file.

An example directory would look like this:

```
src
├── app
├── markdown
│   ├── ultimate
│   │   ├── _meta.json
│   │   ├── dsr.mdx
│   │   ├── fru.mdx
│   │   ├── tea.mdx
│   │   ├── top.mdx
│   │   ├── ucob.mdx
│   │   ├── uwu.mdx
```

## \_meta.json
The `_meta.json` file is a json file that maps a slug to an MDX file. It may
also define the title, order in sidebar, and which links show up in the sidebar.  

### Reserved slugs
Slugs that are currently reserved are:
- index
- title
- order
- groups
- sidebar

### Object structure
A page object's structure will look something like this:
```
{
    index: string           // filename
    title?: string          // title on webpage and quicklinks component
    order?: int             // position which page appears in quicklinks component
    groups?: string[]       // limits and groups quicklink entries based on groupings
    sidebar: SidebarEntry[] // manually add an entry to the quicklinks component
}
```

A SidebarEntry object's structure will look something like this:
```
{
    type: string        // type of page, a value of "mdx" will attempt to get optional info from related areas
    slug: string
    title?: string      // title of page on quicklinks component, required if type is not mdx
    order?: int         // position which page appears in quicklinks component
    groups?: string[]   // groups quicklink entries based on groupings
}
```

### Examples
This section will show how to structure the `_meta.json` file.

#### Defining a page
The following example assumes that the `_meta.json` is located within
`@/markdown/ultimate` and the `markdownFolders` const is properly set in
`constants.js`.

To define a slug path, the `_meta.json` must be populated with syntactically
valid json. Each branch in the json file represents a slug path. 

If I wanted to create a slug at `mywebsite.com/ultimate/this/is/an/example`
the `_meta.json` should first look something like this:
```json
{
    "this": {
        "is": {
            "an": {
                "example": {}
            }
        }
    }
}
```
By itself, it will throw a 404 error. We now need to point the slug to a
specific MDX file by adding an `index` key with the filepath.
Let's point this slug to an mdx file with the path
`@/markdown/ultimate/my_first_page.mdx`.
```json
{
    "this": {
        "is": {
            "an": {
                "example": {
                    "index": "my_first_page.mdx"  // filepath relative to _meta.json
                }
            }
        }
    }
}
```
The MDX file should now be visible at `mywebsite.com/ultimate/this/is/an/example`.
Upon running `npm run build`, this url should also be valid slug due to
`generateStaticParams()` and the page should generated as an SSG page.

#### Setting a title
Expanding on the previous example, now we want to set a title in `_meta.json`.
This can be done by adding a "title" key. 
```json
{
    "this": {
        "is": {
            "an": {
                "example": {
                    "index": "my_first_page.mdx",
                    "title": "Hello World!"
                }
            }
        }
    }
}
```

#### Adding another page
Now, lets add another page. Let's say this time I want to point the URL
`mywebsite.com/ultimate/this/is/another/example` to an MDX file at
`@/markdown/ultimate/subfolder/my_second_page.mdx`.
```json
{
    "this": {
        "is": {
            "an": {
                "example": {
                    "index": "my_first_page.mdx",
                    "title": "Hello World!"
                }
            },
            "another": {
                "example": {
                    "index": "subfolder/my_second_page.mdx",  // again, filepath relative to _meta.json
                }
            }
        }
    }
}
```

#### Setting the order of pages in the Quick Links component
Let's say we have a `_meta.json` like so:
```json
{
    "something": {
        "index": "page1.mdx"
    },
    "something2": {
        "index": "page2.mdx"
    },
    "makethisfirst": {
        "index": "first.mdx"
    },
}
```
The Quick Links component should populate like so:
```
Quick Links Component
├── something
├── something2
├── makethisfirst
```
If we want to order it like so:
```
Quick Links Component
├── makethisfirst
├── something
├── something2
```
We need to add the "order" key to each page.
```json
{
    "something": {
        "index": "page1.mdx",
        "order": 1
    },
    "something2": {
        "index": "page2.mdx",
        "order": 2
    },
    "makethisfirst": {
        "index": "first.mdx",
        "order": 0
    },
}
```

#### Limiting the entries in Quick Links
Let's say we want to limit the entries and group entries in Quick Links based
on categories.
We want this resulting layout in the quick links component and
we also have a Category C at a sibling slug that we do not want visible.
```
Quick Links Component
├── Category A
│   └── Page A
├── Category B
│   ├── Page B1
│   └── Page B2
```
The following will give us the result we want.
```json
{
    "page_a": {
        "index": "page_a.mdx",
        "groups": ["Shared Group", "Category A"]
    },
    "page_b1": {
        "index": "page_b1.mdx",
        "groups": ["Shared Group", "Category B"],
        "order": 1
    },
    "page_b2": {
        "index": "page_b2.mdx",
        "groups": ["Shared Group", "Category B"],
        "order": 2
    },
    "page_c": {
        "index": "page_c.mdx",
        "groups": ["Independent Group", "Category C"]  // No shared groups
    }
}
```
Because `page_c` has no shared groups, it will not appear in the Quick Links
component of the other 3 pages and vice versa.  
For the first 3 pages, the Quick Links component will automatically remove the
highest level of shared groups with no pages, so the "Shared Group" category
will not be visible. The subcategories (Category A and Category B) will
instead take its place as the top-level category in the Quick Links component.

#### Manually adding an entry in Quick Links
If we want to manually add an entry in the Quick Links component such as a
parent page or a completely unrelated page altogether, we can utilize the
`sidebar` key.

Let's say we have the following:
```json
{
    "base_page": {
        "index": "base.mdx",
        "child_1": {
            "index": "child_1.mdx"
        },
        "child_2": {
            "index": "child_2.mdx"
        }
    }
}
```
We want to add the slug for `base_page` to the Quick Links component of 
`base_page/child_1` and `base_page/child_2`.

We can do the following to add the base page to the parent page:
```json
{
    "base_page": {
        "index": "base.mdx",
        "child_1": {
            "index": "child_1.mdx",
            "sidebar": [
                {
                    "type": "mdx",
                    "slug": "/ultimate/base_page"
                }
            ]
        },
        "child_2": {
            "index": "child_2.mdx",
            "sidebar": [
                {
                    "type": "mdx",
                    "slug": "/ultimate/base_page"
                }
            ]
        }
    }
}
```

... and vice versa

```json
{
    "base_page": {
        "index": "base.mdx",
        "sidebar": [
            {"type": "mdx", "slug": "/ultimate/base_page/child_1"},
            {"type": "mdx", "slug": "/ultimate/base_page/child_2"}
        ],
        "child_1": {
            // ...
        },
        "child_2": {
            // ...
        }
    }
}
```

For a sidebar entry of type "mdx", the system will attempt to automatically
populate things like `title`, `order`, and `groups` based on the original
page entry and page frontmatter.  
For anything that's not of type "mdx" (no other types implemented as of 
right now), you will need to specify the `title` at least. `order` will default
to 0 and `groups` will just be empty.

### Multiple \_meta.json files
Multiple `_meta.json` may exist within different subdirectories within a
difficulty folder but functionality is **not thoroughly tested**. When multiple
`_meta.json` exist, the `_meta.json` that is closer to the to the folder
structure of the slug is prioritized unless it does not contain the definition
for the slug. Filepaths to the MDX file are relative to where the `_meta.json`
is located, so a slug at `/ultimate/dsr/guide` will prioritize the file at
`@/markdown/ultimate/dsr/_meta.json` over `@/markdown/ultimate/_meta.json`.