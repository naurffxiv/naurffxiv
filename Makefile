NPM_PATH = naurffxiv/src

install:
ifeq ($(OS),Windows_NT)
	# Install NVM for Windows if not installed
	@if not exist "%NVM_HOME%" powershell -Command "& {Invoke-WebRequest https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.zip -OutFile nvm-setup.zip; Expand-Archive nvm-setup.zip -DestinationPath .; Start-Process .\nvm-setup.exe -Wait}"
	# Install Node and npm
	nvm install latest
	nvm use latest
else
	# Install NVM for Unix-based systems if not installed
	@if [ -z "$$(command -v nvm)" ]; then \
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash; \
		export NVM_DIR="$$HOME/.nvm"; \
		[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
	fi
	export NVM_DIR="$$HOME/.nvm"; \
	[ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh"; \
	nvm install node; \
	nvm use node;
endif

	# Install npm packages
	cd $(NPM_PATH) && npm install

start:
ifeq ($(OS),Windows_NT)
	cd $(NPM_PATH) && npm run dev
else
	cd $(NPM_PATH) && npm run dev
endif

.PHONY: install start
