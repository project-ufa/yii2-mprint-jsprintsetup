<?php

namespace projectufa\mprint;

use yii\helpers\Html;

/**
 * This is just an example.
 */
class MPrintWidget extends \yii\base\Widget
{
	const BUTTON = 'button';
	const TIMER  = 'timer';

	public $mprintAsset = 'projectufa\mprint\MPrintAsset';

	public $text = "";

	public $showIcon = true;

	public $showLink = true;

	public $icon = "glyphicon glyphicon-print";

	/**
	* @var string HTML element (div or class) which will be printed.
	* Defaults to '#page'.
	*/
	public $element = '#page';

	/* @var bool This will show the document to be printed at the bottom of the
	* screen instead of printing it out to the printer.
	* Defaults to false.
	* @since 0.1.0
	*/
	public $debug = false;
	/**
	* @var string  The variable to be used instead of $css. This variable is used
	* more often in Yii, and I don't see any benefit for me to unique in this part. ;)
	* If $css and $cssFile are both given, $cssFile will be preferred. But if they were
	* both not given, the default css file will be given, which is 'mprint.css'
	* @since 1.0
	*/
	public $cssFile = NULL;

	/**
	* @var sting The width of the debug portion. This will only be used if debug is
	* set to true
	* @since 1.0
	*/
	public $dbgWidth = '100%';

	/**
	* @var sting The height of the debug portion. This will only be used if debug is
	* set to true
	* @since 1.0
	*/
	public $dbgHeight = '100%';

	/**
	* @var integer The number of seconds before the frame will be removed. This will only
	* be used if debug is set to false
	*/
	public $timeOut = 60;
	 
	/**
	 * @var string 
	 */
	public $return_printed = 'printed'; 
	
	/**
	 *
	 * @var string id of the print link 
	 */
	public $id = 'mprint';
	
	/**
	 *
	 * @var string filename of js file 
	 */
	public $jsFile = 'mPrint.js';
	
	/**
	 *
	 * @var string redirUrl 
	 */
	public $redirUrl = null;

	public $trigger = MPrintWidget::BUTTON;

	public $jsPrintSettings = [];

	public function init()
	{
		$this->_registerAssets();

	}

    public function run()
    {
    	if($this->showLink)
    		$content = $this->showPrintLink();
    	else 
    		$content = '';

        return $content;
    }

	public function _registerAssets() {
		\Yii::$app->view->registerAssetBundle($this->mprintAsset);
		$this->mPrint();
	}

    /**
     * @desc renders the link for printing the page
     */
    private function showPrintLink() {
        // Evaluate if the text should be displayed. If spaces are given, it is as
        // good as nothing
        $text = (strlen(trim($this->text)) > 0) ? $text = "&nbsp;" . $this->text : '';

        // Should the icon be displayed?
        $icon = $this->showIcon ? Html::tag('span', '', ['class'=>$this->icon]) : '';

        return Html::a($icon . $text, [''], ['class' => 'btn btn-primary', 'id' => $this->id]);
    }

    /**
     * @desc the one calling our js file
     */
    public function mPrint() {
        $mac = array();
        //set the file name. Defaults to the title of the HTML
        if (isset($this->title) && strlen($this->title) > 0)
            $mac['documentName'] = $this->title;

        //give the link to the CSS file to be used by the report
        //$mac['cssFile'] = $this->assetsPath . '/' . $this->mCssFile();

        //tell the script whether to enable the debug mode or not
        $mac['debug'] = $this->debug;
        $mac['dbgHeight'] = $this->dbgHeight;
        $mac['dbgWidth'] = $this->dbgWidth;
        $mac['dbgWidth'] = $this->dbgWidth;
        $mac['return_printed'] = $this->return_printed;
        $mac['jsPrintSettings'] = $this->jsPrintSettings;
				
		//tell the redirUrl
		$mac['redirUrl'] = $this->redirUrl;
        
        //set the iframe timeout
        $mac['timeOut'] = $this->timeOut;

        $encodedSettings = json_encode($mac);
        
        //seting up the script
 		if($this->showLink) {
        	$js = "\$('#{$this->id}').attr('href', 'javascript:void( 0 )').click(function(){\$('$this->element').print('$encodedSettings');console.log('printing...');return false;});";
        	$this->getView()->registerJs($js);
 		}

        if($this->trigger == MPrintWidget::TIMER) {
        	$js1 = "setTimeout(function(){console.log('click on print'); \$('$this->element').print($encodedSettings); /*\$('#$this->id').trigger('click');*/}, 500);";
        	$this->getView()->registerJs($js1);
        }
    }

}
