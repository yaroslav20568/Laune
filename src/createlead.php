<?php
$queryUrl = 'https://crm.zov-home.ru/rest/451/6wk1via6cyeoin4t/crm.lead.add.json';
$queryData = http_build_query(array(
    'fields' => array(
        'TITLE' => 'Заявка из laune.zov-home.ru',
        'NAME' => $_POST["name"],
        'PHONE' => array(
            array(
                "VALUE" => $_POST["phone"], 
                "VALUE_TYPE" => "WORK"
            )
        ),
        'ADDRESS_CITY' => $_POST["city"]
    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")
)); 
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_POST => 1,
    CURLOPT_HEADER => 0,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => $queryUrl,
    CURLOPT_POSTFIELDS => $queryData,
));
$result = curl_exec($curl);
curl_close($curl);
?>