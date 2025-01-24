fx_version 'adamant'
game 'gta5'

lua54 'yes'

author 'xsnufy'
version '1.0.0'
description 'Hud xsnufy'

-- Skrypty klienckie
client_scripts {
    'client/*.lua',
    'config/*.lua',
}


-- Skrypt współdzielony
shared_scripts {
    '@ox_lib/init.lua'
}

-- Pliki HTML
ui_page 'html/index.html'

-- Zasoby plików
files {
    'html/index.html',
    'html/css/*.css',
    'html/scripts/*.js'
}
