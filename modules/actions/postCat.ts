const ajax_get = (url: string, callback: (args: any) => void) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + ' in ' + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send();
};

export const postCat = () => {
    const thisCat = ajax_get(
        'https://api.thecatapi.com/v1/images/search?size=full',
        function (data) {
            document.getElementById('id').innerHTML = data[0]['id'];
            document.getElementById('url').innerHTML = data[0]['url'];

            var html = '<img src="' + data[0]['url'] + '">';
            document.getElementById('image').innerHTML = html;
        }
    );
};
