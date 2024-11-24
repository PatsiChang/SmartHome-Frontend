This basic structure promotes decoupling and code reusable

project-root/
├── playwright.config.ts             # Playwright configuration file
├── tests/                            # Folder for test files
│   ├── auth/                         # Sub-folder for authentication-related tests
│   │   ├── login.spec.ts             # Tests for login functionality
│   │   └── signup.spec.ts            # Tests for signup functionality
│   ├── recipe/                       # Sub-folder for recipe-related tests
│   │   ├── createRecipe.spec.ts      # Tests for creating a new recipe
│   │   └── homePage.spec.ts          # Tests for displaying recipes on the homepage
│   └── helpers/                      # Helper functions for test cases
│       └── authHelpers.ts            # Helper functions for login, signup
├── fixtures/                         # Folder for reusable test data and mock responses
│   ├── users.json                    # Sample user data for login/signup tests
│   └── recipes.json                  # Sample recipe data for create/display tests
├── reports/                          # Directory for Playwright test reports
└── package.json                      # NPM package file with dependencies (Playwright, etc.)


CI - Just add a command line to run the playwright in jenkins, no need to build


Commands:
    npx playwright test ./tests/auth/login.spec.ts  

